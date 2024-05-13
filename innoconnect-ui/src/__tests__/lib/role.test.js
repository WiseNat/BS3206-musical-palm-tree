import { getRoleIcon } from '@/app/lib/role';
import { render, screen } from '@testing-library/react';

// use the following for a great debugger: screen.logTestingPlaygroundURL()

describe("getRoleIcon", () => {
    it("returns StarIcon when given 'founder'", () => {
        render(getRoleIcon("founder"))

        const element = screen.getByTestId("StarIcon");

        expect(element).toBeTruthy()
    });
});
