import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
    it('should render list items', () => {
        const { getByText } = render(<App/>)

        expect(getByText('Davi')).toBeInTheDocument();
        expect(getByText('Diego')).toBeInTheDocument();
        expect(getByText('Mayk')).toBeInTheDocument();
    });

    it('Should be able to add new item to the list', async () => {
        const { getByText, debug } = render(<App/>)

        const addButton = getByText('Adicionar');

        debug()

        await userEvent.click(addButton);

        debug()

        expect(getByText('Novo')).toBeInTheDocument();
    })
});