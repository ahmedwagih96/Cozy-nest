"use client";
import { FcMenu } from "react-icons/fc";
import { useState, useRef } from "react";
import useDropdown from "@/hooks/useDropdown";
import { Dropdown } from "@/components";
function MobileNav() {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  // useDropdown custom hook
  useDropdown(dropDownRef, () => setDropDown(false));
  return (
    <div className="md:hidden cursor-pointer relative" ref={dropDownRef}>
      <FcMenu size="2em" onClick={() => setDropDown((prev) => !prev)} />
      {dropDown ? <Dropdown setDropDown={setDropDown}  /> : null}
    </div>
  );
}

export default MobileNav;
