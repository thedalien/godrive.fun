import React from 'react'

export default function AdminPageEdit() {
    const [showEditCars, setShowEditCars] = useState(false);
    const [showDeleteCars, setShowDeleteCars] = useState(false);

    const showEditable = () => setShowEditCars(true);
    const showDeletable = () => setShowDeleteCars(true);
  return (
    <div>        
        <fieldset id="editCar">
            <legend>Edit Car</legend>
            {showEditCars ? 
                <div id="carGridEdit">
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>

                </div>
            : "Please select the Show Car button"}
            <button id="showCars" onClick={showEditable}>Show Cars</button> {/* Show cars */}
        </fieldset>
        <fieldset id="deleteCar">
            <legend>Delete Car</legend>
            {showDeleteCars ? 
                <div id="carGridDelete">
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                </div>
            : "Please select the Show Car button"}
            <button id="showCars" onClick={showDeletable}>Show Cars</button> {/* Show cars */}
        </fieldset>
    </div>
  )
}
