export default {

	async nonConvertedSender () {

		try {

			if(Select1Copy1.selectedOptionValue == "none"  || Select1Copy1.selectedOptionValue == undefined) {
				const status = await non_conv_msg_only.run();
				showAlert(`Message Success Status: ${status.success}`);
				closeModal(Modal1Copy.name);
			}
			else {
				const status = await non_conv_msg_with_file.run();
				showAlert(`Message Success Status: ${status.success}`);
				closeModal(Modal1Copy.name);
			}


		}
		
			catch(e) {
			showAlert('Error Sending Whatsapp Msg!', 'error');
			
		const errorInfo = {
    name: e?.name || "UnknownError",
    message: e?.message || JSON.stringify(e),
    stack: e?.stack || "No stack trace"
  };
			
			const payloadString = JSON.stringify(errorInfo);
			
			await Promise.all([
				
			event_insert.run({
			event: 'error', 
			event_from: 'appsmith frontend followup whatsapp sender', 
			event_to: '-', 
			actor: '-',
			payload: payloadString
			
		}),
					
					whatsapp_error.run({receiver: '03244811332', text: payloadString})
					
					
				])
			
			throw(e);
		}
		
		
	},
	
	async followUpSender () {

		try {

			if(Select1Copy1Copy.selectedOptionValue == "none"  || Select1Copy1Copy.selectedOptionValue == undefined) {
				const status = await followup_msg_only.run();
				showAlert(`Message Success Status: ${status.success}`);
				closeModal(Modal1CopyCopy.name);
			}
			else {
				const status = await followup_msg_with_file.run();
				showAlert(`Message Success Status: ${status.success}`);
				closeModal(Modal1CopyCopy.name);
			}


		}
		
			catch(e) {
			showAlert('Error Sending Whatsapp!', 'error');
			
		const errorInfo = {
    name: e?.name || "UnknownError",
    message: e?.message || JSON.stringify(e),
    stack: e?.stack || "No stack trace"
  };
			
			const payloadString = JSON.stringify(errorInfo);
			
			await Promise.all([
				
			event_insert.run({
			event: 'error', 
			event_from: 'appsmith frontend followup whatsapp sender', 
			event_to: '-', 
			actor: '-',
			payload: payloadString
			
		}),
					
					whatsapp_error.run({receiver: '03244811332', text: payloadString})
					
					
				])
			
			throw(e);
		}
		
		
	}
}
	
	