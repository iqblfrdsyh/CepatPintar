"use client";

import React from "react";
import Link from "next/link";
import { AImodels } from "@/data/data.AI-model";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import useAIModel from "@/hooks/useModelAI";
import { authUserSession } from "@/libs/auth-session";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";
import ModalSelect from "@/components/modalSelect";

const NavigationBar = () => {
  const switchAIModel = useAIModel((state) => state.switchAIModel);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (value) => {
    const selectedModel = AImodels.AI_models.find((model) => model.id == value);

    if (selectedModel) {
      switchAIModel(selectedModel.name);
    }
  };

  const AIModel = useAIModel((state) => state.AIModel);

  const { session } = authUserSession();

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
      }
    });
  };

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <Navbar className="sm:py-3 sm:px-7 flex justify-between items-center fixed top-0 w-screen bg-transparent opacity-100 z-50">
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
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={session?.user.name.trim().split(" ")[0][0].toUpperCase()}
                size="sm"
                src={session?.user.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold truncate w-40">
                  {session?.user.email}
                </p>
              </DropdownItem>
              <DropdownItem key="settings" onClick={handleOpen}>
                Select Model
              </DropdownItem>

              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <ModalSelect isOpen={isOpen} onClose={onClose}>
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
              className="text-black w-[250px]"
            >
              {model.name}
            </SelectItem>
          ))}
        </Select>
      </ModalSelect>
    </>
  );
};

export default NavigationBar;
