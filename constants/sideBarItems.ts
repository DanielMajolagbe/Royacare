import { IconType } from "react-icons";
import { FaUserPlus } from "react-icons/fa";
import { TiHome, TiUser } from "react-icons/ti";
import { 
  MdAccountCircle,
  MdAnnouncement, 
  MdShield,
  MdTableChart,
  MdDocumentScanner,
  MdDashboard,
  MdPeople,
  MdAssignment,
  MdSettings,
  MdSwapVert,
  MdNoteAdd,
  MdRateReview,
  MdPayments,
  MdLocationOn,
  MdBorderAll
} from "react-icons/md";

interface sideBarItemType {
  title: string;
  route: string;
  Icon: IconType;
  type?: string;
  isExternal?: boolean; // Add this to identify external links
}

const sideBarItems: sideBarItemType[] = [
  {
    title: "Home",
    route: "/",  // Changed to relative path
    Icon: TiHome,
    isExternal: false
  },
  
];


export default sideBarItems;
