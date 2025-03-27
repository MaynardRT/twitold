const editableContent = document.getElementById('editableContent');
        const countValue = document.getElementById('countValue');
        const submitBtn = document.getElementById('submitBtn');
        const maxLength = 280;
        let lastValidContent = "";

        // Update the character count and enforce limit
        function updateContent() {
            const content = editableContent.innerText.trim();
            const currentLength = content.length;
            
            // Prevent exceeding character limit
            if (currentLength > maxLength) {
                editableContent.innerText = lastValidContent;
                return;
            }
            
            // Update last valid content
            lastValidContent = content;
            
            // Update character count display
            countValue.textContent = `${currentLength}/${maxLength}`;
            
            // Change color if approaching limit
            if (currentLength > maxLength * 0.9) {
                countValue.classList.add('warning');
            } else {
                countValue.classList.remove('warning');
            }
            
            // Enable/disable submit button
            submitBtn.disabled = currentLength === 0 || currentLength > maxLength;
        }

        // Handle form submission
        function handleSubmit() {
            const content = editableContent.innerText.trim();
            if (content.length === 0 || content.length > maxLength) return;
            
            // Here you would normally send the data to a server
            alert(`Posted: "${content}"`);
            
            // Clear the content after posting
            editableContent.innerText = '';
            updateContent();
        }

        // Event listeners
        editableContent.addEventListener('input', updateContent);
        
        editableContent.addEventListener('keydown', function(e) {
            const currentLength = editableContent.innerText.length;
            if (currentLength >= maxLength) {
                if (!(
                    e.key === 'Backspace' || 
                    e.key === 'Delete' ||
                    e.key.startsWith('Arrow') ||
                    e.key === 'Tab' ||
                    e.ctrlKey ||
                    e.metaKey
                )) {
                    e.preventDefault();
                }
            }
            
            // Submit on Ctrl+Enter or Cmd+Enter
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleSubmit();
            }
        });
        
        editableContent.addEventListener('focus', function() {
            this.style.borderColor = '#1da1f2';
        });
        
        editableContent.addEventListener('blur', function() {
            this.style.borderColor = 'aqua';
        });
        
        submitBtn.addEventListener('click', handleSubmit);

        // Initialize
        updateContent();
        