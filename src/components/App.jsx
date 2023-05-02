import { React, Component } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Searchbar from './Searchbar';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import Button from './Button';

class App extends Component {
  state = {
    isLoading: false,
    filter: '',
    currentPage: 1,
    images: [],
    modalToShow: false,
    modalImg: {},
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.filter !== this.state.filter ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ isLoading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.filter}&page=${this.state.currentPage}&key=34544645-2c62a1021489ea1157fadd1e4&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          if (data.hits.length === 0) {
            return toast('No data to show!');
          }
          this.setState(
            prevState => ({
              images: [...prevState.images, ...data.hits],
            }),
            () => {
              if (this.state.currentPage !== 1) {
                window.scrollBy({
                  top: 500,
                  behavior: 'smooth',
                });
              }
            }
          );
        })
        .catch(error => window.alert(error))
        .finally(
          this.setState({
            isLoading: false,
          })
        );
    }
  }

  onSubmit = event => {
    event.preventDefault();
    if (event.currentTarget.elements.search.value.trim() === '') {
      toast('No data to search!');
      return;
    }
    this.setState({
      filter: event.currentTarget.elements.search.value,
      currentPage: 1,
      images: [],
    });
  };

  handlePageChanger = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  togleModal = () => {
    this.setState(({ modalToShow }) => ({
      modalToShow: !modalToShow,
    }));
  };

  getModalImg = (webformatURL, tags) => {
    this.setState({
      modalImg: { webformatURL, tags },
    });
  };

  render() {
    const { modalToShow, modalImg, images, isLoading } = this.state;
    return (
      <div className={css.Container}>
        {modalToShow && <Modal img={modalImg} showModal={this.togleModal} />}
        <Searchbar onSubmit={this.onSubmit} />
        {images && (
          <ImageGallery
            getData={this.getModalImg}
            showModal={this.togleModal}
            dataToRender={images}
          />
        )}
        {isLoading && (
          <ProgressBar
            height="300"
            width="300"
            ariaLabel="progress-bar-loading"
            wrapperClass={css.progressBarWrapper}
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        )}

        {images.length !== 0 && (
          <Button onClick={this.handlePageChanger} fetchData={this.fetchData} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}

export default App;

// ------- Для дальнейшего разбора------

// componentDidMount() {
//   this.setState({ isLoading: true });
//   this.fetchData()
//     .then(images => {
//       if (images) {
//         this.setState({
//           images: images.hits,
//         });
//       }
//     })
//     .finally(() => {
//       this.setState({
//         isLoading: false,
//       });
//     });
// }

// componentDidUpdate(_, prevState) {
//   console.log('Did Update');
//   if (prevState.currentPage !== this.state.currentPage) {
//     this.setState({ isLoading: true });
//     this.fetchData(this.state.currentPage, this.state.filter)
//       .then(images => {
//         this.setState(
//           {
//             images: [...prevState.images, ...images.hits],
//           },
//           () => {
//             window.scrollBy({
//               top: 500,
//               behavior: 'smooth',
//             });
//           }
//         );
//       })
//       .finally(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//   }

//   if (prevState.filter !== this.state.filter) {
//     this.setState({ isLoading: true, images: null });
//     this.fetchData(1, this.state.filter).then(images => {
//       this.setState({
//         images: images.hits,
//         isLoading: false,
//       });
//     });
//   }
// }

// async fetchData() {
//   const data = await fetch(
//     `https://pixabay.com/api/?q=${this.state.filter}&page=${this.state.currentPage}&key=34544645-2c62a1021489ea1157fadd1e4&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   const images = await data.json();
//   return images;
// }

// onSubmit = event => {
//   event.preventDefault();
//   if (event.currentTarget.elements.search.value.trim() === '') {
//     toast('No data to search!');

//     return;
//   }
//   this.setState({
//     filter: event.currentTarget.elements.search.value,
//     currentPage: 1,
//   });
// };

// handlePageChanger = () => {
//   this.setState(prevState => ({
//     currentPage: prevState.currentPage + 1,
//   }));
// };

// -----------------------------------------

// async fetchData(
//   filter = this.state.filter,
//   currentPage = this.state.currentPage
// ) {
//   this.setState({ isLoading: true });
//   const response = await fetch(
//     `https://pixabay.com/api/?q=${filter}&page=${currentPage}&key=34544645-2c62a1021489ea1157fadd1e4&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   if (response.ok) {
//     const images = await response.json();
//     this.setState({
//       isLoading: false,
//     });
//     if (images.hits.length !== 0) {
//       return images;
//     }
//     return toast('No data to show!');
//   }

//   return Promise.reject(new Error('Error'));
// }

// onSubmit = event => {
//   event.preventDefault();
//   if (event.currentTarget.elements.search.value.trim() === '') {
//     toast('No data to search!');
//     return;
//   }
//   this.fetchData(event.currentTarget.elements.search.value, 1)
//     .then(data => {
//       this.setState(
//         {
//           currentPage: 1,
//           images: data.hits,
//         },
//         () => {
//           window.scrollBy(0, -window.innerHeight);
//         }
//       );
//     })
//     .catch(error => {
//       Window.alert(error);
//     })
//     .finally(
//       this.setState({
//         filter: event.currentTarget.elements.search.value,
//       })
//     );
// };

// handlePageChanger = () => {
//   this.fetchData(this.state.filter, this.state.currentPage + 1)
//     .then(data => {
//       this.setState(
//         prevState => ({
//           currentPage: prevState.currentPage + 1,
//           images: [...prevState.images, ...data.hits],
//         }),
//         () => {
//           window.scrollBy({
//             top: 500,
//             behavior: 'smooth',
//           });
//         }
//       );
//     })
//     .catch(error => {
//       Window.alert(error);
//     });
// };
