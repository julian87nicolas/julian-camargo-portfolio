function LocalizedSiteLayout({
  HeaderComponent,
  MainpageComponent,
  AboutComponent,
  FooterComponent,
  includeFallback = false
}) {
  // MainpageComponent provides the panel list via a render prop pattern.
  // But for cleanliness, we let MainpageComponent accept a FooterComponent
  // and return panels directly.
  return (
    <MainpageComponent
      HeaderComponent={HeaderComponent}
      AboutComponent={AboutComponent}
      FooterComponent={FooterComponent}
    />
  );
}

export default LocalizedSiteLayout;