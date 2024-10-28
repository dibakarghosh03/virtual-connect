import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";
import logo from "@/assets/logo.png";
import { tokenAtom, userAtom } from "@/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { logout } from "@/api/auth";

const Navbar = () => {
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);
  let userFallback = user?.firstName.charAt(0) + user?.lastName.charAt(0);
  return (
    <div className="w-full flex items-center justify-between border-b-[1px] border-gray-600 lg:px-32 py-3">
      <div className="flex items-center gap-x-1">
        <img src={logo} width={45} />
        <h1 className="font-bold text-3xl">VirtualConnect</h1>
      </div>
      <div>
        {token ? (
          <div className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>{userFallback}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <AlertDialog>
                <AlertDialogTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <LogOut />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out of the application.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        logout();
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            className="font-semibold text-lg"
            onClick={() => {
              window.location.href = "/auth";
            }}
          >
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
