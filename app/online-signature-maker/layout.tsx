import { ReactNode } from "react";

export default function OnlineSignatureMakerLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Allison&family=Allura&family=Bilbo+Swash+Caps&family=Caveat:wght@400..700&family=Comforter+Brush&family=Dancing+Script:wght@400..700&family=Dr+Sugiyama&family=Fuggles&family=Great+Vibes&family=Kaushan+Script&family=Liu+Jian+Mao+Cao&family=Lobster&family=Monsieur+La+Doulaise&family=Montez&family=Mrs+Saint+Delafield&family=Over+the+Rainbow&family=Pacifico&family=Parisienne&family=Permanent+Marker&family=Pinyon+Script&family=Qwigley&family=Reenie+Beanie&family=Sacramento&family=Satisfy&family=Style+Script&family=Zeyada&display=swap"
                rel="stylesheet"
            />
            {children}
        </>
    );
}
