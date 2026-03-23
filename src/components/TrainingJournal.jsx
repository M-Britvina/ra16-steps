import React from "react";
import { TrainingForm } from "./TrainingForm";
import { TrainingList } from "./TrainingList";
import moment from "moment/moment";
import './TrainingJournal.css';

export class TrainingJournal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            trainings: [],
            formData: {},
         };
    }

    parseDateToISO(dateString) {
        return moment(dateString, "DD.MM.YYYY", true).format("YYYY-DD-MM");
    }

    handleFormSubmit() {
        let {trainings, formData } = this.state;

        if (!moment(formData.date, "DD.MM.YYYY", true).isValid()) {
            alert('Введите дату в формате ДД.ММ.ГГГГ');
            return;
        }

        const existingIndex = formData.id 
            ? trainings.findIndex(t => t.id === t.id)
            : trainings.findIndex(t => t.date === formData.date);
        

        if (existingIndex !== -1) {
            const newTrainings = [...trainings];
            const newDistance = formData.id 
                ? Number(formData.distance)
                : Number(newTrainings[existingIndex].distance) + Number(formData.distance);
            
            newTrainings[existingIndex] = {
                ...newTrainings[existingIndex],
                distance: newDistance.toFixed(1),
                date: formData.date,
                sortingDate: this.parseDateToISO(formData.date),
            };
            newTrainings.sort((a, b) => new Date(b.sortingDate) - new Date(a.sortingDate));
            this.setTrainings(newTrainings);
        } else {
            const newTraining = {
                id: new Date().getTime(),
                date: formData.date,
                sortingDate: this.parseDateToISO(formData.date),
                distance: Number(formData.distance).toFixed(1),
            };
            
            const updatedTrainings = [...trainings, newTraining];
            updatedTrainings.sort((a, b) => new Date(b.sortingDate) - new Date(a.sortingDate));
            this.setTrainings(updatedTrainings);
        }
        this.setFormData({});
    }

    setTrainings(trainings) {
        this.setState({trainings: trainings});
    }

    setFormData(formData) {
        this.setState({formData: formData})
    }

    handleFormChange(name, value ) {
        const {formData }= this.state;
        const newFormData = {
            ...formData,
            [name]: value
        };
        this.setFormData(newFormData);
    };

    handleDelete(date) {
        this.setTrainings(this.state.trainings.filter(training => training.date !== date));
    }

    render() {
        const {formData, trainings} = this.state;
        return (
            <div className="container">
                <TrainingForm 
                    formData={formData}
                    handleFormChange={(name, value) => this.handleFormChange(name, value)}
                    handleFormSubmit={() => this.handleFormSubmit()}
                />
                <TrainingList trainings={trainings} 
                handleEdit={training => this.setFormData(training)}
                handleDelete={(date) => this.handleDelete(date)} />
            </div>
        )
    }
}