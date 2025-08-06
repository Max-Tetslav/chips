import { MOCK_CHIPS } from '@entities/Chip';
import { ChipsWidget } from '@widgets/ui/ChipsWidget';

export const App = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'grid',
                placeItems: 'center'
            }}
        >
            <ChipsWidget chips={MOCK_CHIPS} />
        </div>
    );
};
