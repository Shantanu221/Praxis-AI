"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId, isLoading } = useProject();
  const truncateName = (name: string) =>
    name.length > 20 ? `${name.slice(0, 19)}...` : name;

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/Praxis_Logo.png" alt="logo" height={40} width={40} />
          {open && (
            <h1 className="text-2xl font-bold text-primary/80">Praxis</h1>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm tracking-tighter">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn({
                          "!bg-primary !text-white": pathname === item.url,
                        })}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm tracking-tighter">
            Your Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading
                ? // Skeleton loader
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="my-1 h-6 animate-pulse rounded-md bg-gray-300"
                    ></div>
                  ))
                : projects?.map((project) => {
                    return (
                      <SidebarMenuItem key={project.name}>
                        <SidebarMenuButton asChild>
                          <div
                            onClick={() => {
                              setProjectId(project.id);
                            }}
                          >
                            <div
                              className={cn(
                                "flex size-6 items-center justify-center rounded-sm border bg-white text-sm text-primary",
                                {
                                  "bg-primary text-white":
                                    project.id === projectId,
                                },
                              )}
                            >
                              {project.name[0]}
                            </div>
                            <span>{truncateName(project.name)}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              <div className="h2"></div>
              {open && (
                <SidebarMenuItem>
                  <Link href="/create">
                    <Button size="sm" variant="outline" className="w-fit">
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
