import { Button, Dropdown, } from "react-bootstrap";
import { useState } from "react";
import RemoveModal from "../RemoveModal";
import RenameModal from "../RenameModal";

const RemovableChannel = ({ channel, isActive, onClick }) => {
  const [removeModalOpened, setRemoveModalOpened] = useState(null);
  const [renameModalOpened, setRenameModalOpened] = useState(null);

  const handleClick = (handleOpen) => {
    handleOpen(true);
  }

  return (
    <div className="d-flex">
      <Button
        variant={isActive ? 'primary' : 'light'}
        onClick={onClick}
        className={`text-start flex-grow-1 rounded-0 border-end-0 ${isActive ? 'text-white' : ''}`}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        # {channel.name}
      </Button>
      <Dropdown
          align="end"
          drop="down"
          className="rounded-0"
        >
          <Dropdown.Toggle
            variant={isActive ? 'primary' : 'light'}
            className={`rounded-0 border-start-0 ${isActive ? 'text-white' : ''}`}
          />
          
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={() => handleClick(setRemoveModalOpened)}>Удалить</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => handleClick(setRenameModalOpened)}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <RemoveModal opened={removeModalOpened} setOpened={setRemoveModalOpened} channel={channel} />
        <RenameModal opened={renameModalOpened} setOpened={setRenameModalOpened} channel={channel} />
    </div>
  );
};

export default RemovableChannel;