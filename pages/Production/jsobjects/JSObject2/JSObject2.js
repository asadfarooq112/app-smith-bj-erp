export default {
	
	
async alterationHandover () {
	
		try {
			
			const payload_data = `
			Item: ${Text5.text}, 
			By: ${Input4.text},
			To: ${Input4Copy.text},
			Location: ${Input5.text},
			Comment: ${Input6.text}
			`;
			
			await Promise.all([
				
				receive_alteration.run(),
				handover_alteration.run(),
				upload_alteration_handovers.run(),
				
			
				//db event
				event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4.text, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.alteration_product_received', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4.text,
					payload: payload_data
				})
			
				
				
			])
				

			
			
			

			closeModal(Modal3.name);
			showAlert(`Received Handover: ${payload_data}`);

			await alterations.run();

		}
		catch (e) {
			console.log(e?.message);
			throw(e);
		}
	},
	
	
	async newmakeHandover () {
	
		try {
			
			const payload_data = `
			Item: ${Text5Copy.text}, 
			By: ${Input4Copy1.text},
			To: ${Input4CopyCopy.text},
			Location: ${Input5Copy.text},
			Comment: ${Input6Copy.text}
			`;
			
			await Promise.all([
				
				receive_newmake.run(),
				handover_newmake.run(),
				upload_newmake_handovers.run(),
				
			
				//db event
				event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4Copy1.text, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.new_make_product_received', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4Copy1.text,
					payload: payload_data
				})
			
				
				
			])
				

			
			
			

			closeModal(Modal3Copy.name);
			showAlert(`Received Handover: ${payload_data}`);

			await new_make.run();

		}
		catch (e) {
			console.log(e?.message);
			throw(e);
		}
	}
}