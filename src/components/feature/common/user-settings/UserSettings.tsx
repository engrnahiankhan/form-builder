import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { logoutUser } from "@/store/actions/userAction";

const UserSettings = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  console.log("check use image:", user?.photoURL);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar className="h-10 w-10 rounded-full overflow-hidden shadow">
          <AvatarImage
            src={user?.photoURL || "https://github.com/shadcn.png"}
            alt={user?.displayName || "User"}
            className="object-cover"
          />
          <AvatarFallback className="rounded-full">
            {user?.displayName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => dispatch(logoutUser())}
          className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSettings;
