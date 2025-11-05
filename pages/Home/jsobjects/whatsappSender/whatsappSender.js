export default {

	async followUpSender () {

		try {

			if(Select1Copy1.selectedOptionValue == "none"  || Select1Copy1.selectedOptionValue == undefined) {
				await non_conv_msg_only.run();
				showAlert('Whatsapp Msg Sent', 'success');
				closeModal(Modal1Copy.name);
			}
			else {
				await non_conv_msg_with_file.run();
				showAlert('Whatsapp Msg Sent', 'success');
				closeModal(Modal1Copy.name);
			}


		}
		catch(e) {
			console.log(e);
			throw(e);}
	}
}
	
	