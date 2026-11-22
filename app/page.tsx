import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Collection } from "@/components/collection";
import { CustomStudio } from "@/components/custom-studio";
import { Policies } from "@/components/policies";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <MotionProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Collection />
        <CustomStudio />
        <Policies />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </MotionProvider>
  );
}
