import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { closeModalRemoveChat } from "../../slices/modalsSlice";

const RemoveModal = ({ channel }) => {
  const [disabled, setDisabled] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const token = useSelector((state) => state.auth.user.token);
  const modalRemoveChatStatus = useSelector((state) => state.modals.modalRemoveChat.status);

  const notify = () => toast.success(t('notifications.deleted'));

  const handleDelete = async () => {
    setDisabled(true);
    try {
      await axios.delete(`/api/v1/channels/${channel.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify();
    } catch(e) {
      console.log(e);
    } finally {
      setDisabled(false);
      dispatch(closeModalRemoveChat());
    }
  };

  return (
    <Modal show={modalRemoveChatStatus} onHide={() => dispatch(closeModalRemoveChat())} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('modals.removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{t('modals.removeModal.confirmation')}</div>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={() => dispatch(closeModalRemoveChat())}>
          {t('modals.removeModal.cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={disabled}>
          {t('modals.removeModal.remove')}
          </Button> 
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;