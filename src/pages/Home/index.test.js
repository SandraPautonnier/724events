import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.queryAllByText("En cours");
      await screen.queryAllByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    // Attends que les événements soient affichés dans la page
    const eventTitle = screen.queryAllByText("Nos réalisations");
    expect(eventTitle);
    // Vérifie que la liste des événements s'affiche
    screen.queryAllByText("Événements");
    screen.queryAllByText("Nos services");
  });

  it("a list of people is displayed", async () => {
    render(<Home />);
    // Vérifie que la section de l'équipe est présente
    const peopleTitle = screen.queryAllByText("Notre équipe");
    expect(peopleTitle);
    // Vérifie que la liste des membres de l'équipe est affichée
    await screen.findByText("Samira");
    await screen.findByText("Jean-baptiste");
    await screen.findByText("Alice");
    await screen.findByText("Luís");
    await screen.findByText("Christine");
    await screen.findByText("Isabelle");
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    // Vérifie que le footer est présent
    const footer = await screen.findByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    // Vérifie que certaines sections du footer sont présentes
    await screen.findByText("Notre dernière prestation");
    await screen.findByText("Contactez-nous");
    screen.queryAllByText("Une agence événementielle");
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    // Vérifie que la carte de l'événement avec la dernière prestation est bien affichée
    const eventCard = await screen.findByText("Notre dernière prestation");
    expect(eventCard).toBeInTheDocument();
    screen.queryAllByText("image");
    screen.queryAllByText("Titre");
  });
});