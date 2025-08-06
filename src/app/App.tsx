import { MOCK_CHIPS } from '@entities/Chip';
import { ChipsWidget } from '@widgets/chipsWidget';

export const App = () => {
    return (
        <div className="app">
            <ChipsWidget chips={MOCK_CHIPS} />
        </div>
    );
};
