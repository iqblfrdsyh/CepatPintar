"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AImodels } from "@/data/data.AI-model";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import useAIModel from "@/hooks/useModelAI";
import { authUserSession } from "@/libs/auth-session";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";
import { Modals } from "@/components/modals";
import TableLeaderboard from "@/components/table";
import { getAllUsers } from "@/libs/api-libs";

const NavigationBar = ({ onChange, darkmode }) => {
  const switchAIModel = useAIModel((state) => state.switchAIModel);
  const { session } = authUserSession();

  const [isSelectOpen, setSelectOpen] = useState(false);
  const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleChange = (value) => {
    const selectedModel = AImodels.AI_models.find((model) => model.id == value);

    if (selectedModel) {
      switchAIModel(selectedModel.name);
    }
  };

  const AIModel = useAIModel((state) => state.AIModel);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
        localStorage.removeItem("alertShown");
      }
    });
  };

  useEffect(() => {
    const fetchDataUsers = async () => {
      const response = await getAllUsers("user");
      setUsers(response.data.users);
    };
    fetchDataUsers();
  }, []);

  return (
    <>
      <Navbar className="sm:py-2 sm:px-7 flex justify-between items-center fixed top-0 w-screen bg-transparent opacity-100 z-40">
        <NavbarBrand className="absolute sm:static">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.svg" alt="logo" width={30} height={30} />
            <div className="flex gap-1 ml-2">
              <h1 className="text-[24px] font-semibold gradient-text-logo">
                CepatPintar
              </h1>
              <span className="text-[11px] text-right font-semibold text-gray-400">
                v1.0.0
              </span>
            </div>
          </Link>
        </NavbarBrand>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end" className="dark:text-white">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="success"
                name={session?.user.name.trim().split(" ")[0][0].toUpperCase()}
                size="sm"
                src={session?.user.image}
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider aria-label="Preferences">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold truncate w-40">
                    {session?.user.email}
                  </p>
                </DropdownItem>
                <DropdownItem key="model" onClick={() => setSelectOpen(true)}>
                  Select Model
                </DropdownItem>
                <DropdownItem
                  key="leaderboard"
                  onClick={() => setLeaderboardOpen(true)}
                >
                  Leaderboard
                </DropdownItem>
                <DropdownItem
                  key="theme"
                  isReadOnly
                  className="cursor-default"
                  endContent={
                    <select
                      className="z-10 outline-none w-20 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                      value={darkmode ? "dark" : "light"}
                      onChange={onChange}
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  }
                >
                  Theme
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <Modals.ModalSelect
        isOpen={isSelectOpen}
        onClose={() => setSelectOpen(false)}
      >
        <h2>Model aktif : {AIModel}</h2>
        <Select
          placeholder="Select here"
          defaultSelectedKeys={[1]}
          className="w-[145px]"
          variant="underlined"
          color="warning"
          aria-labelledby="AI Model"
          onChange={(e) => handleChange(e.target.value)}
        >
          {AImodels.AI_models.map((model) => (
            <SelectItem
              key={model.id}
              value={model.name}
              className="text-black w-[250px] dark:text-white"
            >
              {model.name}
            </SelectItem>
          ))}
        </Select>
      </Modals.ModalSelect>

      <Modals.ModalLeaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      >
        <TableLeaderboard users={users} />
      </Modals.ModalLeaderboard>
    </>
  );
};

export default NavigationBar;
