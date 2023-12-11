function NavBar(){
    
        const opcje = ["Projekty", "Zespoły","Widok Ogólny", "Wyloguj"];
      
        return (
          <ul class="nav">
            {opcje.map(opcja => (
              <li class="nav-item">
                <a class="nav-link" href='login-page.html'>{opcja}</a>
                </li>
            ))}
          </ul>
        );
      
}
export  default NavBar;