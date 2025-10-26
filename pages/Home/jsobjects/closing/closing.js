export default {

	async closingReport () {

		if (Input6.text != '381000') {

			showAlert('Wrong Password', 'error')

		}
		else {

			try {

				showAlert('Closing Report Generated');
				closeModal(Modal_closing.name);

			}

			catch(e) {
				showAlert('Closing Report Generation. Error!', 'error');
				throw(e);
			}



		}

	}
}