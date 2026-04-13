function LocalizedSiteLayout({
  HeaderComponent,
  MainpageComponent,
}) {
  return (
    <MainpageComponent
      HeaderComponent={HeaderComponent}
    />
  );
}

export default LocalizedSiteLayout;