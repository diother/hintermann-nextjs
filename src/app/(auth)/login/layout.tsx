import AuthHeader from "@/components/auth-header";
import Footer from "@/components/footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthHeader />
            {children}
            <Footer />
        </>
    );
}
