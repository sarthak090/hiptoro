import { drawerAtom } from "@/store/drawer-atom";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
// import Drawer from "./Drawer";

const MobileMainMenu = dynamic(
  () => import("@/components/Layout/Mobile-menu/Mobile-main-menu")
);
const Drawer = dynamic(() => import("./Drawer"));

export default function ManagedDrawer() {
  const [{ display, view, data }, setDrawerState] = useAtom(drawerAtom);

  return (
    <Drawer
      open={display}
      onClose={() => setDrawerState({ display: false, view: "" })}
      variant={
        [
          "FILTER_VIEW",
          "MAIN_MENU_VIEW",
          "FILTER_LAYOUT_TWO_VIEW",
          "SEARCH_FILTER",
        ].includes(view)
          ? "left"
          : "right"
      }
    >
      {view === "MAIN_MENU_VIEW" && <MobileMainMenu />}
    </Drawer>
  );
}
