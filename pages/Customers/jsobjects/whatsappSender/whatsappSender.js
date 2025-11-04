export default {

	async myFun2 () {

		try {

			if(Select1.selectedOptionValue == "none"  || Select1.selectedOptionValue == undefined) {
				await msg_only.run();
				showAlert('Whatsapp Msg Sent', 'success');
				closeModal(Modal1.name);
			}
			else {
				await msg_with_file.run();
				showAlert('Whatsapp Msg Sent', 'success');
				closeModal(Modal1.name);
			}


		}
		catch(e) {
			console.log(e);
			throw(e);}
	}
}