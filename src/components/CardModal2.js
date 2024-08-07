import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CardModal2 = ({ visible, onClose, filterId }) => {
  
  const modalCardModifiers = useSelector((state) => state.card.card?.data?.menu?.modifiers);
  const items = useSelector((state) => state.card.card?.data?.menu?.items);
  const [selectItem, setSelectItem] = useState([]);
  const [modifierName, setModifierName] = useState([]);

  useEffect(() => {
    if (filterId && items) {
      const filteredItems = items?.filter((item) => item.modifiers === filterId);
      setSelectItem(filteredItems);
    }
    if (modalCardModifiers && filterId) {
      const modifiersArray = modalCardModifiers.filter((modifier) => 
        filterId.includes(modifier.modifierCode)
      );

      setModifierName(modifiersArray);

      const filterItemCode = items?.filter((item) =>
        modifiersArray.some((modifier) =>
          modifier.options.some((option) => option.itemCode === item.itemCode)
        )
      );

      setSelectItem(filterItemCode);
    }
  }, [filterId, items,modalCardModifiers]);

 
  if (!visible) return null;

  const handleCloseModal = (e) => {
    if (e.target.id === "modal-container" || e.target.id === "modal-close-btn") onClose();
  };

  return (
    <div
      id="modal-container"
      onClick={handleCloseModal}
      className="fixed inset-0 overflow-y-auto bg-gray-100 bg-opacity-50 backdrop-blur-sm flex justify-end items-center"
    >
      <div className="bg-white h-[700px] mx-5 py-40">
      {
        selectItem[0] &&(
              <>
                   <div>
                        <h2>{selectItem[0]?.name}</h2>
                  </div>
                  <div>
                      <p>{selectItem[0]?.itemDesc}</p>
                  </div>
              
              </>
        )
      }
        <div>
          {modifierName?.map((modifier) => (
            <div key={modifier.modifierCode}>
              <h1 className="bg-slate-500">{modifier?.name}</h1>
              {modifier?.options?.map((option) => (
                selectItem
                  .filter((item) => item.itemCode === option.itemCode)
                  .map((filterItem) => (
                    <div className="flex" key={filterItem.itemCode}>
                      <input type="radio" name="option" />
                      <p>{filterItem.name}</p>
                    </div>
                  ))
              ))}
            </div>
          ))}
        </div>
        <div>
          <button id="modal-close-btn" className="px-7 bg-rose-600 py-1 my-2 rounded-lg"  onClick={handleCloseModal}>Add</button>
        </div>
        <div>
          <button id="modal-close-btn" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal2;
