import { Button, Dropdown, } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import RemoveModal from "../modals/RemoveModal";
import RenameModal from "../modals/RenameModal";
import { setActiveChannel } from "../../slices/channelsSlice";
import { openModalRemoveChat, openModalRenameChat } from "../../slices/modalsSlice";


const RemovableChannel = ({ channel, isActive }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSetActive = (channel) => {
    dispatch(setActiveChannel(channel));
  }

  return (
    <div className="d-flex">
      <Button
        variant={isActive ? 'primary' : 'light'}
        onClick={() => handleSetActive(channel)}
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
            <Dropdown.Item eventKey="1" onClick={() => dispatch(openModalRemoveChat())} active={false}>{t('remove')}</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => dispatch(openModalRenameChat())} active={false}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <RemoveModal channel={channel} />
        <RenameModal channel={channel} />
    </div>
  );
};

export default RemovableChannel;