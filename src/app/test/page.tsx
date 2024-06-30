import { getUserSession } from "@/actions/auth-actions";
import { Billing, DonationForm } from "./forms";
import { getStripeId } from "@/database/auth";

export default async function Page() {
    const user = await getUserSession();
    let stripeId;
    if (user) {
        stripeId = await getStripeId(user);
    }
    return (
        <>
            <DonationForm />
            {stripeId && <Billing stripeId={stripeId} />}
        </>
    );
}
