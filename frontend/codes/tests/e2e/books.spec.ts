import { test, expect } from '@playwright/test';

test.describe('Gerenciamento de Livros E2E', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/pt', { waitUntil: 'networkidle' });
    });

    test('deve exibir o título da aplicação e os filtros', async ({ page }) => {
        await expect(page.getByText('Biblioteca Digital')).toBeVisible();
        await expect(page.locator('#search-general')).toBeVisible();
        await expect(page.locator('#search-title')).toBeVisible();
    });

    test('deve listar livros ou mostrar mensagem de lista vazia', async ({ page }) => {
        const emptyMessage = page.getByText(/Nenhum livro encontrado/i);
        const bookCards = page.locator('div.grid > div');

        await page.waitForTimeout(1000);

        const count = await bookCards.count();
        if (count === 0) {
            await expect(emptyMessage).toBeVisible();
        } else {
            await expect(bookCards.first()).toBeVisible();
        }
    });

    test('deve alternar o idioma para Inglês e voltar para Português', async ({ page }) => {
        const enToggle = page.locator('button').filter({ hasText: /^EN$/ });
        const ptToggle = page.locator('button').filter({ hasText: /^PT$/ });

        await enToggle.click();
        await expect(page).toHaveURL(/.*\/en.*/, { timeout: 10000 });
        await page.waitForTimeout(1000);
        await ptToggle.click();
        await expect(page).toHaveURL(/.*\/pt.*/, { timeout: 10000 });
    });

    test('deve abrir o modal de criação de livro', async ({ page }) => {
        const createBtn = page.getByRole('button', { name: 'Novo Livro' });
        await createBtn.click();

        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByText('Criar novo livro')).toBeVisible();
    });

    test('deve testar a busca por título', async ({ page }) => {
        const titleInput = page.locator('#search-title');
        const testTitle = 'Busca Teste';

        await titleInput.fill(testTitle);
        await expect(titleInput).toHaveValue(testTitle);

        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/.*title=Busca(\+|%20)Teste.*/);
    });

    test('deve criar um novo livro com sucesso', async ({ page }) => {
        const bookTitle = `Automação ${Date.now()}`;

        await page.getByRole('button', { name: 'Novo Livro' }).click();

        await page.locator('#title').fill(bookTitle);
        await page.locator('#author').fill('Autor Teste');
        await page.locator('#pages').fill('200');
        await page.locator('#pubdate').fill(new Date().toISOString().split('T')[0]);

        await page.getByRole('button', { name: 'Criar Livro' }).click();

        await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 10000 });

        await page.locator('#search-title').fill(bookTitle);
        await page.waitForTimeout(1000);

        await expect(page.getByText(bookTitle)).toBeVisible();
    });

    test('deve deletar um livro da lista', async ({ page }) => {
        const tempTitle = `Deletar ${Date.now()}`;

        await page.getByRole('button', { name: 'Novo Livro' }).click();
        await page.locator('#title').fill(tempTitle);
        await page.locator('#author').fill('Temp');
        await page.locator('#pubdate').fill('2024-01-01');
        await page.getByRole('button', { name: 'Criar Livro' }).click();
        await expect(page.getByRole('dialog')).not.toBeVisible();

        await page.locator('#search-title').fill(tempTitle);
        await page.waitForTimeout(1000);

        const bookCard = page.locator('div.grid > div', { hasText: tempTitle }).first();
        await expect(bookCard).toBeVisible();

        await bookCard.getByLabel('Excluir').click();

        await page.getByRole('button', { name: 'Sim, excluir' }).click();
        await expect(page.getByRole('dialog')).not.toBeVisible();
        await page.waitForTimeout(1000);

        await expect(page.getByText(tempTitle)).not.toBeVisible({ timeout: 10000 });
    });
});
