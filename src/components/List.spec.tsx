import { 
    render, 
    waitFor, 
    waitForElementToBeRemoved 
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import List from './List';

describe('List Component', () => {
    it('should render list items', () => {
        
        const { 
            debug, 
            unmount, 
            getByText, 
            queryByText 
        } = render(<List initialItems={['Davi', 'Diego', 'Mayk']} />);

        expect(getByText('Davi')).toBeInTheDocument();
        expect(getByText('Diego')).toBeInTheDocument();
        expect(getByText('Mayk')).toBeInTheDocument();

        unmount();
        render(<List initialItems={['Aline']}/>);
        debug();

        expect(getByText('Aline')).toBeInTheDocument();
        expect(queryByText('Mayk')).not.toBeInTheDocument();
    });

    it('Should be able to add new item to the list', async () => {
        const { getByText, debug, getByPlaceholderText } = render(<List initialItems={[]} />);

        const inputElement = getByPlaceholderText('Novo item');
        const addButton = getByText('Adicionar');

        debug();

        await userEvent.type(inputElement, 'Novo');
        await userEvent.click(addButton);

        debug();

        await waitFor(() => {
            expect(getByText('Novo')).toBeInTheDocument();
        });
    });

    it('Should be able to remove item to the list', async () => {
        const { getAllByText, debug, queryByText } = render(<List initialItems={['Davi']} />);

        const removeButtons = getAllByText('Remover');

        debug();

        await userEvent.click(removeButtons[0]);

        debug();

        await waitForElementToBeRemoved(() => {
            return queryByText('Davi')
        });
    });
});