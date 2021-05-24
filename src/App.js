import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
// import CheckIcon from '@material-ui/icons/Check';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      searchBooks: [],
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: [],
    };

    this.startSearch = this.startSearch.bind(this);
    this.changeBookMode = this.changeBookMode.bind(this);
    this.dataToSelect = this.dataToSelect.bind(this);
  }

  startSearch(e) {
    e.preventDefault();
    BooksAPI.search(e.target.value).then(res => this.setState({ ...this.state, searchBooks: Array.isArray(res)?res:[] }));
  }

  changeBookMode(book, status) {
    debugger;
    let currentlyReadingBooks = [...this.state.currentlyReadingBooks];
    let wantToReadBooks = [...this.state.wantToReadBooks];
    let readBooks = [...this.state.readBooks];
    debugger;;

    switch (status) {
      case "currentlyReading":
        {
          currentlyReadingBooks.push(book)
          wantToReadBooks = wantToReadBooks.filter(b => b.id !== book.id)
          readBooks = readBooks.filter(b => b.id !== book.id)
          break;
        }
      case "wantToRead":
        {
          currentlyReadingBooks = currentlyReadingBooks.filter(b => b.id !== book.id)
          wantToReadBooks.push(book)
          readBooks = readBooks.filter(b => b.id !== book.id)
          break;
        }
      case "read":
        {
          currentlyReadingBooks = currentlyReadingBooks.filter(b => b.id !== book.id)
          wantToReadBooks = wantToReadBooks.filter(b => b.id !== book.id)
          readBooks.push(book)
          break;
        }
      default:
        {
          currentlyReadingBooks = currentlyReadingBooks.filter(b => b.id !== book.id)
          wantToReadBooks = wantToReadBooks.filter(b => b.id !== book.id)
          readBooks = readBooks.filter(b => b.id !== book.id)
          break;
        }

    }
    this.setState({
      ...this.state,
      currentlyReadingBooks: currentlyReadingBooks,
      wantToReadBooks: wantToReadBooks,
      readBooks: readBooks
    })
  }

  dataToSelect(book) {
    debugger;
    let currentlyReadingBooks = [...this.state.currentlyReadingBooks].filter(b => b.id === book.id);
    let wantToReadBooks = [...this.state.wantToReadBooks].filter(b => b.id === book.id);
    let readBooks = [...this.state.readBooks].filter(b => b.id === book.id);
    debugger;;
    let currentValue = "";
    if (currentlyReadingBooks.length > 0) {
      currentValue = "currentlyReading";
    }
    else if (wantToReadBooks.length > 0) {
      currentValue = "wantToRead";
    }
    else if (readBooks.length > 0) {
      currentValue = "read";
    }
    else {
      currentValue = "none";
    }


    return (
      <select
      value={currentValue} 
      onChange={(e) => { e.preventDefault(); console.log(e.target.value); this.changeBookMode(book, e.target.value) }}
      >
        <option value="move" disabled>Move to...</option>
        {
          currentValue === "currentlyReading"
            ? <option value="currentlyReading">✔ Currently Reading</option>
            : <option value="currentlyReading">Currently Reading</option>
        }
        {
          currentValue === "wantToRead"
            ? <option value="wantToRead">✔ Want to Read</option>
            : <option value="wantToRead">Want to Read</option>
        }
        {
          currentValue === "read"
            ? <option value="read">✔ Read</option>
            : <option value="read">Read</option>
        }
        {
          currentValue === "none"
            ? <option value="none">✔ None</option>
            : <option value="none">None</option>
        }
      </select>
    )
  }


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ ...this.state, showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.startSearch} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchBooks.map(book => {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks?book.imageLinks.smallThumbnail:""}")` }}></div>
                          <div className="book-shelf-changer">
                            {this.dataToSelect(book)}
                          </div>
                        </div>
                        <div className="book-title"><a href={book.previewLink}>{book.title}</a></div>
                        <div className="book-authors">
                          {book.authors && book.authors.map(author => `${author} \n`)}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReadingBooks.map(book => {
                        return (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  {this.dataToSelect(book)}
                                </div>
                              </div>
                              <div className="book-title"><a href={book.previewLink}>{book.title}</a></div>
                              <div className="book-authors">
                                {book.authors && book.authors.map(author => `${author} \n`)}
                              </div>
                            </div>
                          </li>
                        )
                      })}

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {console.log(this.state)}
                      {this.state.wantToReadBooks.map(book => {
                        return (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  {this.dataToSelect(book)}
                                </div>
                              </div>
                              <div className="book-title"><a href={book.previewLink}>{book.title}</a></div>
                              <div className="book-authors">
                                {book.authors && book.authors.map(author => `${author} \n`)}
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.readBooks.map(book => {
                        return (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  {this.dataToSelect(book)}
                                </div>
                              </div>
                              <div className="book-title"><a href={book.previewLink}>{book.title}</a></div>
                              <div className="book-authors">
                                {book.authors && book.authors.map(author => `${author} \n`)}
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ ...this.state, showSearchPage: true, searchBooks: [] })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
