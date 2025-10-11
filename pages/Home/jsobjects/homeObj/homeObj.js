export default {

	async attendanceInsert () {
	
		try {
			

		await Attendance_INSERT.run();
		console.log(`${Select_Employee.selectedOptionValue} attendance marked`)
		
		//db event
		await event_insert.run({
			event: 'db.insert', 
			event_from: 'appsmith frontend', 
			event_to: 'bj.attendance', 
			actor: Select_Employee.selectedOptionValue,
			payload: `${Select_Employee.selectedOptionValue} attendance marked`
			
		})
		
		//business event
			await event_insert.run({
			event: 'business.attendance_marked', 
			event_from: 'appsmith frontend', 
			event_to: 'bj.attendance', 
			actor: Select_Employee.selectedOptionValue,
			payload: `${Select_Employee.selectedOptionValue} attendance marked`
			
		})
			
		showAlert(`${Select_Employee.selectedOptionValue} Attendance Marked`);
		closeModal(Attendance_Modal.name);
			
}
		
		catch(e) {
		showAlert('Attendance Not Marked. Error!');
			throw(e);
}
		
	}
}