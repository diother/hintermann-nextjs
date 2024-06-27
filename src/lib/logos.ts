export const logos: Record<string, Logo> = {
    auchan: {
        width: 115,
        height: 27.85,
        href: "https://www.auchan.ro/",
    },
    humana: {
        width: 110,
        height: 29.65,
        href: "https://humana-romania.ro/",
    },
    "alex-star": {
        width: 90,
        height: 37.97,
        href: "https://alexstar.ro/",
    },
    "lista-firme": {
        width: 135,
        height: 17.93,
        href: "https://www.listafirme.ro/",
    },
    carmeuse: {
        width: 100,
        height: 50.39,
        href: "https://www.carmeuse.com/ro-ro",
        className: "-mt-[10px]",
    },
    panfood: {
        width: 78,
        height: 64.29,
        href: "https://panfood.ro/",
    },
    plai: {
        width: 60,
        height: 57.65,
        href: "https://plaicashcarry.ro/",
        className: "-mt-[7px]",
    },
};

export interface Logo {
    width: number;
    height: number;
    href: string;
    className?: string;
}
