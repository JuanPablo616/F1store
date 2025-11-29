describe("Carrito F1 Store", () => {
  it("añade producto al carrito desde home (demo)", () => {
    cy.visit("http://localhost:3000/");

    // Dependiendo de tu HTML exacto:
    cy.contains("Añadir al carrito").first().click();
    cy.get("a[href='/cart']").click();
    cy.contains("Tu carrito").should("exist");
  });
});
