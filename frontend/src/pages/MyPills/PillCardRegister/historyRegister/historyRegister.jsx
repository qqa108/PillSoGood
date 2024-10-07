import { useState } from 'react';
// import LongNextButton from '../../../../components/LongNextButton';
import SelectPage from './SelectPage';
import NextPage from './NextPage';

export default function HistoryRegister() {
    const [step, setStep] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleNextClick = (selectedItems) => {
        setSelectedItems(selectedItems);
        setStep(2);
    };

    return (
        <div>{step === 1 ? <SelectPage onNext={handleNextClick} /> : <NextPage selectedItems={selectedItems} />}</div>
    );
}
