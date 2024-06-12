interface CrossPosition {
    position: "top-left" | "bottom-right" | "bottom-left";
}

export function DecorationCross({ position }: CrossPosition) {
    let crossPosition = "top-0 left-0 -translate-x-1/2";
    if (position === "bottom-right") {
        crossPosition = "bottom-0 right-0 translate-x-1/2";
    } else if (position === "bottom-left") {
        crossPosition = "bottom-0 left-0 -translate-x-1/2";
    }
    return (
        <div
            className={`after:-translate-1/2 absolute z-10 ${crossPosition} h-[1px] w-4 bg-primary/40 after:absolute after:left-0 after:top-0 after:h-[1px] after:w-4 after:-translate-y-1/2 after:rotate-90 after:bg-primary/40 lg:w-6 lg:after:w-6`}
        />
    );
}
export default function DecorationSection({ position }: CrossPosition) {
    const decorationDivs: JSX.Element[] = [];

    for (let i = 0; i < 12; i++) {
        const className = `aspect-square ${!i ? "" : "border-l"} ${i < 8 ? "" : "hidden sm:block"}`;

        decorationDivs.push(
            <div key={i} aria-hidden="true" className={className}></div>,
        );
    }
    return (
        <section className="relative grid grid-cols-8 border sm:grid-cols-12 lg:col-span-2">
            <DecorationCross position={position} />
            {decorationDivs}
        </section>
    );
}
