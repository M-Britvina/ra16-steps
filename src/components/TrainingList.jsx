import './TrainingList.css';

export function TrainingList({trainings, handleDelete, handleEdit}) {
    return (
        <div className="data-table">
            <div className="table-header">
                <div className="col-date">Дата (ДД.ММ.ГГГГ)</div>
                <div className="col-distance">Пройдено км</div>
                <div className="col-actions">Действия</div>
            </div>

            <div className="table-body" id="tableBody">
                { trainings.length === 0 ? (
                    <div className="empty-state">Нет данных о тренировках</div>
                ) : 
                    trainings.map((training) => (
                    <div key={training.id} className="table-row" data-date={training.sortingDate}>
                        <div className="col-date">{training.date}</div>
                        <div className="col-distance">{training.distance}</div>
                        <div className="col-actions">
                            <button className="action-btn edit-btn" title="Редактировать" onClick={() => handleEdit(training)}>✎</button>
                            <button className="action-btn delete-btn" title="Удалить" onClick={() => handleDelete(training.date)}>✕</button>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}