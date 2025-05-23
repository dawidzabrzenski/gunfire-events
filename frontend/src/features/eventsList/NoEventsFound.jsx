function NoEventsFound() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-10 text-center shadow-sm dark:bg-gray-900">
      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        Nie znaleziono żadnych wydarzeń
      </h2>
      <p className="text-gray-600">
        Spróbuj zmienić filtry, aby znaleźć interesujące Cię wydarzenia.
      </p>
    </div>
  );
}

export default NoEventsFound;
