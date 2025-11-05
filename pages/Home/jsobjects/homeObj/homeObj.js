export default {

	async attendanceInsert () {
	
		try {
			
		await Promise.all([
			
				

		Attendance_INSERT.run(),
		
		//db event
		event_insert.run({
			event: 'db.insert', 
			event_from: 'appsmith frontend', 
			event_to: 'bj.attendance', 
			actor: Select_Employee.selectedOptionValue,
			payload: `${Select_Employee.selectedOptionValue} attendance marked`
			
		}),
		
		//business event
			event_insert.run({
			event: 'business.attendance_marked', 
			event_from: 'appsmith frontend', 
			event_to: 'bj.attendance', 
			actor: Select_Employee.selectedOptionValue,
			payload: `${Select_Employee.selectedOptionValue} attendance marked`
			
		})
			
			
		])
		
			
		showAlert(`${Select_Employee.selectedOptionValue} Attendance Marked`);
		closeModal(Attendance_Modal.name);
			resetWidget("Select_Employee");
			
}
		
			catch(e) {
				showAlert('Error Inserting Attendance!', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend attendance', 
					event_to: '-', 
					actor: Select_Employee.selectedOptionValue,
					payload: payloadString

				})

				throw(e);
			}
		
	}
}