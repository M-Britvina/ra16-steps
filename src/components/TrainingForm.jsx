import './TrainingForm.css';

export function TrainingForm({formData, handleFormChange, handleFormSubmit}) {
    const {id, date, distance} = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleFormChange(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit();
    }

    return (
        <div className="form-container">
            <form id="trainingForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="hidden" id="id" name="id"
                            value={id ? id : ''}/>
                    <div className="form-group">
                        <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
                        <input type="text" id="date" name="date" placeholder="20.07.2019"
                            onChange={handleInputChange}
                            value={date ? date : ''}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="distance">Пройдено км</label>
                        <input type="number" id="distance" name="distance" placeholder="5.7"
                            step="0.1" min="0"
                            value={distance ? distance : ''}
                            onChange={handleInputChange}
                            required />
                    </div>

                    <button type="submit" className="submit-btn">OK</button>
                </div>
            </form>
        </div>
    )
}