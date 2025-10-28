export default {

	async myFun2 () {

		if (!Select1Copy.selectedOptionValue) {

			showAlert('Employee not Selected!');

		}
		else {

			try {

				const count_data = `Ladies Rings: ${Input3.text} - Gents Rings: ${Input3Copy.text} - Ear Rings ${Input3Copy3.text} - Pendants: ${Input3Copy1.text} - Nose Pin: ${Input3Copy2.text} - Chains: ${Input3Copy2Copy.text} - Bracelets: ${Input3Copy2CopyCopy.text}`;

				await Promise.all([

					insert_counting.run({count_data: count_data}),
					upload_counting.run(),

					//db event
					event_insert.run({
						event: 'db.insert', 
						event_from: 'appsmith frontend home counting', 
						event_to: 'bj.counting', 
						actor: Select1Copy.selectedOptionLabel,
						payload: count_data

					}),

					//business event
					event_insert.run({
						event: 'business.counting_done', 
						event_from: 'appsmith frontend home counting', 
						event_to: 'bj.counting', 
						actor: Select1Copy.selectedOptionLabel,
						payload: count_data

					})


				])

				showAlert(`${Select1Copy.selectedOptionLabel} Counting Marked`);
				closeModal(Modal5.name);

			}

			catch(e) {
				showAlert('Counting not Marked. Some Error!', 'error');
				throw(e);
			}





		}
	}
}