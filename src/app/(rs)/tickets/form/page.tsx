import BackButton from '@/components/BackButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import { getTicket } from '@/lib/queries/getTickets';
import * as Sentry from '@sentry/nextjs';
import TicketForm from '@/app/(rs)/tickets/form/TicketForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init as kindeInit, user } from '@kinde/management-api-js';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId,ticketId } = await searchParams;
  if(!customerId && !ticketId){
    return {
      title: '缺失工单ID或者客户ID',
      description: '请检查客户ID或工单ID',
    };
  }
  if(!customerId){
    return {
      title: '缺失客户ID',
      description: '请检查客户ID',
    };
  }
  if(!ticketId){
    return {
      title: '缺失工单ID',
      description: '请检查工单ID',
    };
  }
  if(customerId){
    return {
      title: `创建新的工单 - 客户ID#${customerId}`,
      description: '创建新的工单',
    };
  }
  if(ticketId){
    return {
      title: `编辑工单 - 工单ID#${ticketId}`,
      description: '编辑数据',
    };
  }
}
export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">Ticket ID or Customer ID required to load ticket form</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([getPermission('manager'), getUser()]);
    const isMagager = managerPermission?.isGranted;

    // New ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID #{customerId} is not active.</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (isMagager) {
        kindeInit(); // initializes the kinde management api
        const { users } = await Users.getUsers();
        const techs = users ? users.map((user) => ({ id: user.email!, description: user.email! })) : [];
        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      // return ticket form
      if (isMagager) {
        kindeInit(); // initializes the kinde management api
        const { users } = await Users.getUsers();
        const techs = users ? users.map((user) => ({ id: user.email!, description: user.email! })) : [];
        return <TicketForm customer={customer} techs={techs} ticket={ticket} />;
      } else {
        const isEditable = user.email?.toLocaleLowerCase() === ticket.tech.toLocaleLowerCase() ;
        console.log('isEditable',isEditable);
        console.log('user',user.email);
        console.log('ticket',ticket.tech);
        return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />;
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
