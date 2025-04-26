import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const RemoveModal = ({ opened, setOpened, channel }) => {
  const [disabled, setDisabled] = useState(null);
  const { t } = useTranslation();

  const handleDelete = async () => {
    setDisabled(true);
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/v1/channels/${channel.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch(e) {
      console.log(e);
    } finally {
      setDisabled(false);
    }
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Modal show={opened} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('modals.removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{t('modals.removeModal.confirmation')}</div>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleClose}>
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