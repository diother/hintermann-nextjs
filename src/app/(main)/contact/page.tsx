import Meta from "@/lib/metadata";

export const metadata = Meta("Contact", "Pagina de contact Hintermann Charity");

const Page = () => (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
        <h1 className="font-display text-3xl">Vorbește cu noi</h1>
        <div className="flex flex-col gap-4 sm:text-lg">
            <p>
                <span className="font-semibold">Telefon:</span>
                &nbsp;+40 (751) 178 171
            </p>
            <p>
                <span className="font-semibold">Email:</span>
                &nbsp;contact@hintermann.ro
            </p>
            <div className="flex flex-col gap-1">
                <span className="font-semibold">Detalii bancare:</span>
                <p>Asociația de Caritate Hintermann</p>
                <p>RO61 INGB 0000 9999 1494 0141</p>
            </div>
        </div>
    </main>
);

export default Page;
