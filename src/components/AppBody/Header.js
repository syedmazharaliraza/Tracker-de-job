import { Button } from "@mantine/core";
import { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import AddApplicationModal from "../Modal/AddApplicationModal";

const Header = () => {
  const [openedAddModal, setOpenedAddModal] = useState(false);
  return (
    <div className='my-2'>
      <Button variant='default' onClick={() => setOpenedAddModal(true)}>
        Add &nbsp;+
      </Button>
      <AddApplicationModal
        opened={openedAddModal}
        setOpened={setOpenedAddModal}
      />
    </div>
  );
};

export default Header;
