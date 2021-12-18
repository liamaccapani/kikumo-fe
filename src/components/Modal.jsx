import { SettingsOutlined } from "@mui/icons-material";
import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";

const AddSessionModal = ({ isOpen, onClose, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (e) => {
    e.preventDefault();
    onEventAdded({
      title,
      start,
      end,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label> START </label>
          <Datetime value={start} onChange={(date) => setStart(date)} />
        </div>

        <div>
          <label> END </label>
          <Datetime value={end} onChange={(date) => setEnd(date)} />
        </div>
        <button type="submit">ADD SESSION</button>
      </form>
    </Modal>
  );
};

export default AddSessionModal;
