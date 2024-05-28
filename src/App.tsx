import { Global } from "@emotion/react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { styles } from "./globalStyles";

import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector/cjs";
import { initReactI18next } from "react-i18next";
import { LayoutSettingsContext } from "./contexts/layoutSettingsContext";
import eventDetailLoader from "./loaders/eventDetailLoader";
import globalInformationLoader from "./loaders/globalInformationLoader";
import homeLoader from "./loaders/homeLoader";
import linkInBioLoader from "./loaders/linkInBioLoader";
import makeUpcomingEventListLoader from "./loaders/makeUpcomingEventListLoader";
import newsItemLoader from "./loaders/newsItemLoader";
import newsListLoader from "./loaders/newsListLoader";
import BasePage from "./pages/BasePage";
import ErrorPage from "./pages/ErrorPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import LinkInBioPage from "./pages/LinkInBioPage";
import NewsItemPage from "./pages/NewsItemPage";
import NewsListPage from "./pages/NewsListPage";

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          misc: {
            date: "Date",
            unknownErrorOccurred: "An unknown error has occurred",
          },
          menu: {
            home: "Home",
            news: "News & Articles",
            events: "Events",
            aboutUs: "About us",
          },
          events: {
            noEventsFound: "No events have been found...",
            moreEventsText: "More events",
            upcomingEvents: "Upcoming events",
            when: "When",
            where: "Where",
            moreDetails: "More details",
            aboutTheLocation: "About the location:",
            meetYourHost: "Meet your host",
          },
          articles: {
            aboutTheAuthor: "About the author",
            author_one: "Author",
            author_other: "Authors",
          },
        },
      },
      nl: {
        translation: {
          misc: {
            date: "Datum",
            unknownErrorOccurred: "Er is een onbekende fout opgetreden",
          },
          menu: {
            home: "Startpagina",
            news: "Nieuws & Artikelen",
            events: "Evenementen",
            aboutUs: "Over ons",
          },
          events: {
            noEventsFound: "Er zijn geen evenementen gevonden...",
            moreEventsText: "Meer evenementen",
            upcomingEvents: "Aankomende evenementen",
            when: "Wanneer",
            where: "Waar",
            moreDetails: "Meer details",
            aboutTheLocation: "Over de locatie:",
            meetYourHost: "Ontmoet je host",
          },
          articles: {
            aboutTheAuthor: "Over de auteur",
            author_one: "Auteur",
            author_other: "Auteurs",
          },
        },
      },
    },
    fallbackLng: ["nl", "en"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    errorElement: <ErrorPage />,
    loader: globalInformationLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "link-in-bio",
        element: <LinkInBioPage />,
        loader: linkInBioLoader,
      },
      {
        path: "nieuws",
        element: <Outlet />,
        children: [
          { index: true, element: <NewsListPage />, loader: newsListLoader },
          { path: ":slug", loader: newsItemLoader, element: <NewsItemPage /> },
        ],
      },
      {
        path: "evenementen",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: makeUpcomingEventListLoader(5),
          },
          {
            path: ":date/:slug",
            element: <EventDetailPage />,
            loader: eventDetailLoader,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Global styles={styles} />
      <HelmetProvider>
        <LayoutSettingsContext>
          <RouterProvider router={router} />
        </LayoutSettingsContext>
      </HelmetProvider>
    </>
  );
}
